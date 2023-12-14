<script>
    import { uploadExcelFile } from "../apis/adminApis";

    let excelFile = null;

    function handleFileUpload(event) {
        excelFile = event.target.files[0];
    }

    function uploadFile() {
        uploadExcelFile(excelFile);
    }
</script>

<form on:submit|preventDefault={uploadFile}>
    <input type="file" on:change={handleFileUpload} />
    <button type="submit" class="btn btn-primary">Upload</button>
</form>