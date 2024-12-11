import { TodoListDto } from '@/dtos/res/todo-list.dto';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { TodoStatusConst } from '@/consts/todo.const';
import _ from 'lodash';

export default function Home(props: { data: Array<TodoItemEntity> }) {
  const [q, setQ] = React.useState<string>('');
  const [todoList, setTodoList] = React.useState<Array<TodoItemEntity>>([]);

  React.useEffect(() => {
    setTodoList(props.data);
  }, []);

  // toggle DONE / TODO
  const toggleDone = async (
    evt: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    evt.stopPropagation();

    const apiPath = `/api/todo-item/switch-status/${id}`;
    await fetch(apiPath, {
      method: 'PUT',
    }).then((res) => res.json());

    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === TodoStatusConst.DONE
                  ? TodoStatusConst.TODO
                  : TodoStatusConst.DONE,
            }
          : item
      )
    );
  };

  // toggle star
  const toggleStar = async (
    evt: React.ChangeEvent<EventTarget>,
    id: number
  ) => {
    evt.stopPropagation();

    const apiPath = `/api/todo-item/mark/${id}`;
    await fetch(apiPath, {
      method: 'PUT',
    }).then((res) => res.json());

    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              isStar: !item.isStar,
            }
          : item
      )
    );
  };

  // sortList
  const sortList = async (newList: Array<TodoItemEntity>) => {
    const tempList = _.cloneDeep(todoList);
    const curSeq = tempList.map((x) => x.id);

    const newSeq = newList.map((x) => x.id);

    if (!_.isEqual(curSeq, newSeq)) {
      // TODO: update seq
      console.log(newList);
      setTodoList(newList);
    }
  };

  return (
    <div
      className={`grid grid-rows-[100px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className={`flex-col flex grow w-full`}>
        <label
          htmlFor={'key_word'}
          className={
            'flex grow items-center mb-2 text-sm font-medium text-gray-900 dark:text-white'
          }
        >
          Keyword (Title/Content)
        </label>
        <input
          type="text"
          id="key_word"
          className={
            'flex grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
          }
          placeholder="Keyword"
          required
          value={q}
          onChange={(evt) => setQ(evt.target.value)}
        />
      </div>
      <ReactSortable
        list={todoList}
        setList={(newState) => sortList(newState)}
        className="w-full"
      >
        {todoList.map((item: TodoItemEntity) => (
          <div
            key={item.id}
            className="relative flex flex-col my-6 bg-white shadow-sm border dark:border-slate-200 border-slate-950 rounded-lg w-full"
          >
            <div className="p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <input
                    checked={item.status === TodoStatusConst.DONE}
                    id="checked-checkbox"
                    type="checkbox"
                    onChange={(evt) => toggleDone(evt, item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></label>
                  <h5
                    className={
                      ' text-slate-800 text-xl font-semibold ' +
                      (item.status === TodoStatusConst.DONE
                        ? 'line-through'
                        : '')
                    }
                  >
                    {item.title}
                  </h5>
                </div>
                <div className="flex items-center h-6">
                  <svg
                    onClick={(evt) => toggleStar(evt, item.id)}
                    className={
                      'w-6 h-6 ms-1 ' +
                      (item.isStar ? 'text-yellow-300' : 'text-gray-400 ')
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
              <p
                className={
                  'text-slate-600 leading-normal font-light min-h-16 ' +
                  (item.status === TodoStatusConst.DONE ? 'line-through' : '')
                }
              >
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log('server side');
  const apiPath = `${process.env.API_URL}/api/todo-item/list`;
  const res: TodoListDto = await fetch(apiPath).then((res) => res.json());

  return {
    props: {
      data: res.result ?? [],
    },
  };
}
