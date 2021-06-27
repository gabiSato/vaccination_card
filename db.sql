CREATE DATABASE vaccination_card_dev

CREATE SCHEMA public AUTHORIZATION postgres;

CREATE TABLE public.children (
	id uuid NOT NULL,
	cpf varchar(255) NULL,
	"name" varchar(255) NULL,
	inserted_at timestamp(0) NOT NULL,
	updated_at timestamp(0) NOT NULL,
	CONSTRAINT children_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX children_cpf_index ON public.children USING btree (cpf);

CREATE TABLE public.schema_migrations (
	"version" int8 NOT NULL,
	inserted_at timestamp(0) NULL,
	CONSTRAINT schema_migrations_pkey PRIMARY KEY (version)
);

CREATE TABLE public.vaccines (
	id uuid NOT NULL,
	"name" varchar(255) NULL,
	manufacturer varchar(255) NULL,
	description varchar(255) NULL,
	inserted_at timestamp(0) NOT NULL,
	updated_at timestamp(0) NOT NULL,
	CONSTRAINT vaccines_pkey PRIMARY KEY (id)
);

CREATE TABLE public.vaccinations (
	id uuid NOT NULL,
	batch varchar(255) NULL,
	"date" date NULL,
	nurse varchar(255) NULL,
	child_id uuid NULL,
	vaccine_id uuid NULL,
	inserted_at timestamp(0) NOT NULL,
	updated_at timestamp(0) NOT NULL,
	CONSTRAINT vaccinations_pkey PRIMARY KEY (id),
	CONSTRAINT vaccinations_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id),
	CONSTRAINT vaccinations_vaccine_id_fkey FOREIGN KEY (vaccine_id) REFERENCES public.vaccines(id)
);
