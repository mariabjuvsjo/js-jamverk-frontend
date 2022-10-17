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

    getOneDoc: async function getOneDoc(id, tok) {

        const response = await fetch(`${docModel.baseUrl}/text/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tok}`
            }

        });
        const doc = await response.json();


        return doc;


    },

    updateOneDoc: async function updateOneDoc(newDoc, id) {
        const response = await fetch(`${docModel.baseUrl}/text/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(newDoc),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const docs = await response.json();

        console.log(docs);

    },

    sendEmail: async function sendEmail(email) {
        const response = await fetch(`${docModel.baseUrl}/email`,
            {
                method: 'POST',
                body: JSON.stringify(email),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const sent = await response.json();

        console.log(sent);
    }
}
export default docModel;