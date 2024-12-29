# my-first-next-todolist

## Description

This is my first project using Next.js. It is a Todo List app with basic features like CRUD tasks. I hope this can be helpful for other beginners learning Next.js.

## Planned Features

- [V] Todo Items List
- [V] Todo Item Create
- [V] Todo Item Edit
- [V] Todo Item Delete
- [V] Todo Item Add Star
- [V] Todo Item Done

## Additional Notes

- Database: Using PostgreSQL.
- API: Built with Next.js.
- Single Page: No router used.
- Login: Not included.

## Database Schema

### todo_item

| name        | type         | desc                       |
| ----------- | ------------ | -------------------------- |
| id          | serial       | auto increment             |
| title       | varchar(50)  | todo item title            |
| content     | varchar(500) | todo item content (detail) |
| is_star     | boolean      | is marked with a star      |
| status      | varchar(10)  | TODO / DONE                |
| create_time | timestamptz  | create timestamp           |
| update_time | timestamptz  | update timestamp           |
| seq         | integer      | sequence                   |

### DDL

```sql
CREATE TABLE public.todo_item (
	id serial NOT NULL,
	title varchar(50) NOT NULL,
	"content" varchar(500) NULL,
	is_star bool NOT NULL DEFAULT false,
	status varchar(10) NOT NULL DEFAULT 'TODO'::character varying,
	seq int4 NOT NULL DEFAULT 0,
	create_time timestamptz NOT NULL DEFAULT now(),
	update_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT todo_item_pkey PRIMARY KEY (id)
);
```
