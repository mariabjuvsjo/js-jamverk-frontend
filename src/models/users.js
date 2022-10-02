const userModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3001" : "https://jsramverk-editor-mabs21.azurewebsites.net",

    getAllUsers: async function getAllUsers() {

        const response = await fetch(`${userModel.baseUrl}/users`);
        const docs = await response.json();


        return docs;
    },

    regUser: async function regUser(userInfo) {
        const response = await fetch(`${userModel.baseUrl}/users/reg`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);
    },

    loginUser: async function loginUser(userInfo) {
        const response = await fetch(`${userModel.baseUrl}/users/login`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        return result

    }




}
export default userModel;