const docModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3001" : "https://jsramverk-editor-mabs21.azurewebsites.net",

    getAllDocs: async function getAllDocs() {

        const response = await fetch(`${docModel.baseUrl}/text`);
        const docs = await response.json();


        return docs;
    },

    createDoc: async function createDoc(newDoc) {
        const response = await fetch(`${docModel.baseUrl}/text`, {
            method: 'POST',
            body: JSON.stringify(newDoc),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const docs = await response.json();

        console.log(docs);



    },

    getOneDoc: async function getOneDoc(id) {

        const response = await fetch(`${docModel.baseUrl}/text/${id}`);
        const doc = await response.json();


        return doc;


    },

    updateOneDoc: async function updateOneDoc(newDoc, id) {
        const response = await fetch(`${docModel.baseUrl}/text/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newDoc),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const docs = await response.json();

        console.log(docs);

    }
}
export default docModel;