-- Database: codex

-- DROP DATABASE codex;

CREATE DATABASE codex
    WITH
    OWNER = -- Put your own user
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;



-- SCHEMA: public

-- DROP SCHEMA public ;

CREATE SCHEMA public
    AUTHORIZATION postgres;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT ALL ON SCHEMA public TO postgres;

GRANT ALL ON SCHEMA public TO PUBLIC;



-- Table: public.documents

-- DROP TABLE public.documents;

CREATE TABLE public.documents
(
    id integer NOT NULL DEFAULT nextval('documents_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    creation_date timestamp with time zone,
    CONSTRAINT documents_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;



-- Table: public.tags

-- DROP TABLE public.tags;

CREATE TABLE public.tags
(
    id integer NOT NULL DEFAULT nextval('tags_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id),
    CONSTRAINT tag_names_unique UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Index: tag_names_index

-- DROP INDEX public.tag_names_index;

CREATE INDEX tag_names_index
    ON public.tags USING gin
    (name COLLATE pg_catalog."default" gin_trgm_ops)
    TABLESPACE pg_default;



-- Table: public.doc_tags

-- DROP TABLE public.doc_tags;

CREATE TABLE public.doc_tags
(
    id integer NOT NULL DEFAULT nextval('doc_tags_id_seq'::regclass),
    document_id integer NOT NULL DEFAULT nextval('doc_tags_document_seq'::regclass),
    tag_id integer NOT NULL DEFAULT nextval('doc_tags_tag_seq'::regclass),
    CONSTRAINT doc_tags_pkey PRIMARY KEY (id),
    CONSTRAINT document_fkey FOREIGN KEY (document_id)
        REFERENCES public.documents (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tag_fkey FOREIGN KEY (tag_id)
        REFERENCES public.tags (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Index: unique_document_tag_index

-- DROP INDEX public.unique_document_tag_index;

CREATE UNIQUE INDEX unique_document_tag_index
    ON public.doc_tags USING btree
    (document_id, tag_id)
    TABLESPACE pg_default;
