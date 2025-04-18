<template>
    <title-page>DATA PENYERAHAN DOKUMEN POKOK</title-page>
    <table class="border border-collapse mx-auto">
        <thead>
            <tr>
                <th-table>No</th-table>
                <th-table>NAMA</th-table>
                <th-table>DEBITUR</th-table>
                <th-table>SERTIPIKAT</th-table>
                <th-table>IMB</th-table>
                <th-table>PENERIMA</th-table>
                <th-table>TANGGAL DIBUAT</th-table>
                <th-table>AKSI</th-table>
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-gray-50 hover:bg-red-50" v-for="(student, index) in students" :key="student.sertipikat" style="font-family: 'Times New Roman', Times, serif;">
                <td-table class="text-center">{{ index + 1 }}</td-table>
                <td-table>{{ student.name }}</td-table>
                <td-table>{{ student.debitur }}</td-table>
                <td-table>{{ student.sertipikat }}</td-table>
                <td-table>{{ student.imb }}</td-table>
                <td-table>{{ student.penerima }}</td-table>
                <td-table>{{ student.created_at }}</td-table>
                <td-table>
                    <blue-button @click="editStudent(student)">Edit</blue-button>
                    <span class="mx-1"></span>
                    <red-button @click="deleteStudent(student.sertipikat)">Hapus</red-button>
                </td-table>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    inject: ['students', 'deleteStudent', 'editStudent']
};
</script>

<style scoped>
.border {
    border: 1px solid #e5e7eb;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.1);
}
</style>