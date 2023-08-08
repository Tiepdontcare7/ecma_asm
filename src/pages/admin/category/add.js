import axios from 'axios';
import Swal from 'sweetalert2';
import Joi from 'joi';
import { router, useEffect } from '../../../lib';
import { $ } from '../../../utilities';
import { urlCate } from '../../../config/config';

const schema = Joi.object({
    name: Joi.string().trim().min(5).required(),
});

const AdminCategoryAdd = () => {
    useEffect(() => {
        $('.add').addEventListener('submit', (e) => {
            e.preventDefault();
            const category = $('.category');
            const data = {
                name: category.value,
            };
            const {
                error,
                value: { name },
            } = schema.validate(data);

            if (!error) {
                axios.post(urlCate, data).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: `Add ${name} to category successfully`,
                    }).then(() => {
                        router.navigate('/admin/category');
                    });
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    text: 'Something went wrong!',
                });
            }
        });
    });

    return `
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
            dolores deleniti inventore quaerat mollitia?
            </p>

            <form
            action=""
            class="add mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
            <p class="text-center text-lg font-medium">Add category</p>

            <div>
                <label for="email" class="sr-only">Email</label>

                <div class="relative">
                <input
                    type="text"
                    class="category w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter category"
                />
                </div>
            </div>
            <button
                type="submit"
                class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
                Add
            </button>

            <p class="text-center text-sm text-gray-500">
                No account?
                <a class="underline" href="">Sign up</a>
            </p>
            </form>
        </div>
        </div>

    `;
};

export default AdminCategoryAdd;
