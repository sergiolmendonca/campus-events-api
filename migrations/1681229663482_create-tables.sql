-- Up Migration
CREATE TABLE people (
  id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name        VARCHAR(255) NOT NULL,
  age         INT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE event (
  id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name        VARCHAR(255) NOT NULL UNIQUE,
  date        DATE NOT NULL,
  person_id   INT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  CONSTRAINT fk_event_person FOREIGN KEY (person_id) REFERENCES people(id)
);

-- Down Migration
DROP TABLE people;
