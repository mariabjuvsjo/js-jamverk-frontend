import useUser from '../hooks/useUser';


const docModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3001" : "https://jsramverk-editor-mabs21.azurewebsites.net",



    createDoc: async function createDoc(newDoc, tok) {
        const response = await fetch(`${docModel.baseUrl}/text`, {
            method: 'POST',
            body: JSON.stringify(newDoc),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tok}`
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

    updateOneDoc: async function updateOneDoc(newDoc) {
        const response = await fetch(`${docModel.baseUrl}/text/${newDoc._id}`,
            {
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