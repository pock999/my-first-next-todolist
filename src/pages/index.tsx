import { TodoListDto } from '@/dtos/res/todo-list.dto';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { TodoStatusConst } from '@/consts/todo.const';
import _ from 'lodash';

const initForm = {
  isShow: false,
  id: null,
  title: '',
  content: '',
};

export default function Home(props: { data: Array<TodoItemEntity> }) {
  const [todoList, setTodoList] = React.useState<Array<TodoItemEntity>>([]);

  React.useEffect(() => {
    setTodoList(props.data);
  }, []);

  const [form, setForm] = React.useState<{
    isShow: boolean;
    id: null | number;
    title: string;
    content: string;
  }>(initForm);

  const setFormValue = (
    target: 'id' | 'title' | 'content' | 'isShow',
    value: any
  ) => {
    setForm((pre) => ({
      ...pre,
      ...(target === 'id' ? { id: value } : {}),
      ...(target === 'title' ? { title: value } : {}),
      ...(target === 'content' ? { content: value } : {}),
      ...(target === 'isShow' ? { isShow: value } : {}),
    }));
  };

  const closeForm = () => {
    setForm(initForm);
  };

  const submitForm = async () => {
    let apiPath;
    if (form.id === null) {
      // create
      apiPath = `/api/todo-item/create`;
      const res = await fetch(apiPath, {
        method: 'POST',
        body: JSON.stringify({
          ..._.pick(form, ['title', 'content']),
        }),
      }).then((res) => res.json());
      setTodoList((preList) => [
        {
          ..._.pick(form, ['title', 'content']),
          ...res,
        },
        ...preList,
      ]);
    } else {
      // update
      apiPath = `/api/todo-item/${form.id}`;
    }

    closeForm();
  };

  // toggle DONE / TODO
  const toggleDone = async (
    evt: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    evt.stopPropagation();

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

    const apiPath = `/api/todo-item/switch-status/${id}`;
    await fetch(apiPath, {
      method: 'PUT',
    }).then((res) => res.json());
  };

  // toggle star
  const toggleStar = async (
    evt: React.ChangeEvent<EventTarget>,
    id: number
  ) => {
    evt.stopPropagation();

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

    const apiPath = `/api/todo-item/mark/${id}`;
    await fetch(apiPath, {
      method: 'PUT',
    }).then((res) => res.json());
  };

  // sortList
  const sortList = async (newList: Array<TodoItemEntity>) => {
    const tempList = _.cloneDeep(todoList);
    const curSeq = tempList.map((x) => x.id);

    const newSeq = newList.map((x) => x.id);

    if (!_.isEqual(curSeq, newSeq)) {
      console.log(newList);
      setTodoList(newList);

      const apiPath = `/api/todo-item/change-seq`;
      await fetch(apiPath, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          newList.map((x, index) => ({
            id: x.id,
            seq: index + 1,
          }))
        ),
      }).then((res) => res.json());
    }
  };

  return (
    <div
      className={`grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className={`flex w-full justify-center`}>
        <button
          type="button"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setFormValue('isShow', true)}
        >
          Create Todo
        </button>
      </div>

      {form?.isShow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => closeForm()}
            >
              &#x2715;
            </button>
            <div className={`flex-col flex grow w-full`}>
              <label
                htmlFor={'key_word'}
                className={
                  'flex grow items-center mb-2 text-sm font-medium text-gray-900 '
                }
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className={
                  'flex grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 '
                }
                placeholder="Title"
                required
                value={form.title}
                onChange={(evt) => setFormValue('title', evt.target.value)}
              />
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 mt-2 "
              >
                Content
              </label>
              <textarea
                id="content"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write contents..."
                value={form.content}
                onChange={(evt) => setFormValue('content', evt.target.value)}
              ></textarea>
              <div className={`flex w-full justify-center`}>
                <button
                  type="button"
                  className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => submitForm()}
                >
                  {form.id === null ? 'Create' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
