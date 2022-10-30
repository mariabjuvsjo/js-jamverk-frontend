const codeModal = {
    executeCode: async function executeCode(inputs) {
        const data = {
            code: btoa(inputs)
        };
        const response = await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();
        let decodedOutput = atob(result.data);
        console.log(decodedOutput);
        return decodedOutput;
    }
};

export default codeModal;