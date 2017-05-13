-- add trigram extension for autocomplete
CREATE EXTENSION pg_trgm;


-- create documents table
CREATE TABLE public.documents
(
    id SERIAL NOT NULL,
    name text COLLATE pg_catalog."default",
    creation_date timestamp with time zone,
    CONSTRAINT documents_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


-- create tags table
CREATE TABLE public.tags
(
    id SERIAL NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (id),
    CONSTRAINT tag_names_unique UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- add trigram index on tag names
CREATE INDEX tag_names_index
    ON public.tags USING gin
    (name COLLATE pg_catalog."default" gin_trgm_ops)
    TABLESPACE pg_default;


-- create doc tag table for associations
CREATE TABLE public.doc_tags
(
    id SERIAL NOT NULL,
    document_id integer NOT NULL,
    tag_id integer NOT NULL,
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

-- add index on (doc,tag) couple for uniqueness
CREATE UNIQUE INDEX unique_document_tag_index
    ON public.doc_tags USING btree
    (document_id, tag_id)
    TABLESPACE pg_default;

