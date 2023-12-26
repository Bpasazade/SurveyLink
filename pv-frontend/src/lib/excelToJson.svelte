<script>
    localStorage.setItem('storedRoute', 'excelToJson');
    import { uploadExcelFile } from "../apis/adminApis";

    let excelFile = null;

    function handleFileUpload(event) {
        excelFile = event.target.files[0];
        console.log(excelFile);
    }

    let companyId = "6589acb4542c4fc443e159a7";
    let groupId = "658ad056508e20e38f4d6403";

    function uploadFile() {
        uploadExcelFile(excelFile, companyId, groupId);
    }
</script>

<form on:submit|preventDefault={uploadFile}>
    <input type="file" on:change={handleFileUpload} />
    <button type="submit" class="btn btn-primary">Upload</button>
</form>