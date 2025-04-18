<template>
    <title-page>DATA PENYERAHAN DOKUMEN POKOK</title-page>
    <div class="mx-auto max-w-full px-4 sm:px-6">
        <!-- Mobile Card View -->
        <div class="block sm:hidden space-y-4">
            <div v-for="(student, index) in students" :key="student.sertipikat" class="border rounded-lg shadow-md p-4 bg-white">
                <div class="flex justify-between items-center">
                    <div class="font-semibold text-base">{{ student.name }}</div>
                    <button @click="toggleDetails(index)" class="text-blue-600 text-sm">
                        {{ expanded[index] ? 'Sembunyikan' : 'Tampilkan' }}
                    </button>
                </div>
                <div v-if="expanded[index]" class="mt-3 text-sm" style="font-family: 'Times New Roman', Times, serif;">
                    <p><strong>Nama:</strong> {{ student.name }}</p>
                    <p><strong>Debitur:</strong> {{ student.debitur }}</p>
                    <p><strong>Sertipikat:</strong> {{ student.sertipikat }}</p>
                    <p><strong>IMB:</strong> {{ student.imb }}</p>
                    <p><strong>Penerima:</strong> {{ student.penerima }}</p>
                    <p><strong>Tanggal Dibuat:</strong> {{ student.created_at }}</p>
                    <div class="mt-3 flex space-x-2">
                        <blue-button class="px-4 py-2 text-sm min-h-[44px]" @click="editStudent(student)">Edit</blue-button>
                        <red-button class="px-4 py-2 text-sm min-h-[44px]" @click="deleteStudent(student.sertipikat)">Hapus</red-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden sm:block overflow-x-auto">
            <table class="border border-collapse w-full text-sm sm:text-base">
                <thead class="bg-gray-100 sticky top-0">
                    <tr>
                        <th-table class="py-3 px-4">No</th-table>
                        <th-table class="py-3 px-4">NAMA</th-table>
                        <th-table class="py-3 px-4">DEBITUR</th-table>
                        <th-table class="py-3 px-4">SERTIPIKAT</th-table>
                        <th-table olemn class="py-3 px-4">IMB</th-table>
                        <th-table class="py-3 px-4">PENERIMA</th-table>
                        <th-table class="py-3 px-4">TANGGAL DIBUAT</th-table>
                        <th-table class="py-3 px-4">AKSI</th-table>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-gray-50 hover:bg-red-50" v-for="(student, index) in students" :key="student.sertipikat" style="font-family: 'Times New Roman', Times, serif;">
                        <td-table class="text-center py-3 px-4">{{ index + 1 }}</td-table>
                        <td-table class="py-3 px-4">{{ student.name }}</td-table>
                        <td-table class="py-3 px-4">{{ student.debitur }}</td-table>
                        <td-table class="py-3 px-4">{{ student.sertipikat }}</td-table>
                        <td-table class="py-3 px-4">{{ student.imb }}</td-table>
                        <td-table class="py-3 px-4">{{ student.penerima }}</td-table>
                        <td-table class="py-3 px-4">{{ student.created_at }}</td-table>
                        <td-table class="py-3 px-4 flex justify-center space-x-2">
                            <blue-button class="px-4 py-2 text-sm min-h-[44px]" @click="editStudent(student)">Edit</blue-button>
                            <red-button class="px-4 py-2 text-sm min-h-[44px]" @click="deleteStudent(student.sertipikat)">Hapus</red-button>
                        </td-table>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['students', 'deleteStudent', 'editStudent'],
    data() {
        return {
            expanded: {}
        };
    },
    methods: {
        toggleDetails(index) {
            this.expanded = { ...this.expanded, [index]: !this.expanded[index] };
        }
    }
};
</script>

<style scoped>
.border {
    border: 1px solid #e5e7eb;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.1);
}
th-table, td-table {
    border: 1px solid #e5e7eb;
}
</style>