<template>
    <div class="relative overflow-x-auto my-20">



        <div class="flex items-center justify-center w-full">
            <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                            upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ fileName ? fileName : 'Select Any File' }}
                    </p>
                </div>
                <input id="dropzone-file" @change="handleFileChange" type="file" class="hidden" />
            </label>
        </div>
        <button :disabled="file == ''" @click="uploadFile()" class="bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2">
            Save File
        </button>

        <div class="flex justify-start mb-2 my-2 mx-2 bg-white-500">
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">File</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="file in files" :key="file.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 font-medium text-red-500 whitespace-nowrap dark:text-white">
                        {{ file.file_url }}
                    </td>
                    <td class="px-6 py-4">
                        <button @click="deleteFile(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Delete
                        </button>
                        <button @click="downloadFile(file.file_url)" class="bg-blue-500 text-white px-4 py-2 rounded mx-2">
                            Download File
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
            file: '',
            fileName: '',
            files: []
        };
    },
    mounted() {
        this.fetchFiles();
    },
    methods: {
        async fetchFiles() {
            try {
                const response = await axios.post(`http://localhost:3000/api/projects/task-subtask-files`, { id: this.$route.params.id, identifier: 'subTask' });
                this.files = response.data.data;
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        },
        async downloadFile(fileUrl) {
            const url = fileUrl.split('/');
            const fileName = url[url.length - 1];
            axios({
                url: `http://localhost:3000/api/projects/download/${fileName}`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileName);
                document.body.appendChild(fileLink);
                fileLink.click();
            });
        },
        async deleteFile(fileId) {
        },
        async handleFileChange(event) {
            this.file = event.target.files[0];
            this.fileName = this.file.name;
        },
        async uploadFile() {
            try {
                const formData = new FormData();
                formData.append('file', this.file);
                formData.append('identifier', 'subTask');
                formData.append('id', this.$route.params.id)
                await axios.post('http://localhost:3000/api/projects/files', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.fileName = '';
                this.file = '';
                this.fetchFiles();
            } catch (error) {
                console.error("Error fetching projects:", error);
            }

        }
    },
};
</script>