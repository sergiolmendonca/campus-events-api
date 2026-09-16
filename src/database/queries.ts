import { HttpError } from '../errors';
import { getPool } from './pool';
import { Person, Event } from './types';

export interface Queries {
  checkConnection(): Promise<boolean>;
  getAllPeople(): Promise<Person[]>;
  addPerson(person: Person): Promise<Person>;
  createEvent(event: Event): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
}

export const makeQueries = (databaseUrl: string): Queries => {
  const pool = getPool(databaseUrl);

  return {
    checkConnection: async () => {
      try {
        const { rows } = await pool.query<{ conn_test: number }>('SELECT 1 as conn_test');
        return rows[0].conn_test === 1;
      } catch {
        return false;
      }
    },
    getAllPeople: async () => {
      const { rows } = await pool.query<Person>(
        `
        SELECT id, name, age
        FROM people
        `,
      );
      return rows;
    },
    addPerson: async ({ name, age }) => {
      const { rows, rowCount } = await pool.query<Person, [string, number]>(
        `
        INSERT INTO people (name, age)
        VALUES ($1, $2)
        RETURNING id, name, age
        `,
        [name, age],
      );
      if (rowCount !== 1) {
        throw new HttpError(500, 'Something went wrong');
      }
      return rows[0];
    },
    getAllEvents: async () => {
      const { rows } = await pool.query<Event>(
        `
        SELECT id, name, date, person_id
        FROM event
        `,
      );
      return rows;
    },
    createEvent: async ({ name, date, person_id }) => {
      const { rows, rowCount } = await pool.query<Event, [string, string, number]>(
        `
        INSERT INTO event (name, date, person_id)
        VALUES ($1, $2, $3)
        RETURNING name, date, person_id
        `,
        [name, date, person_id],
      );
      if (rowCount !== 1) {
        throw new HttpError(500, 'Something went wrong');
      }
      return rows[0];
    },
  };
};
