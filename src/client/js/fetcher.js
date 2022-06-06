const fetcher = (()=>{
    const getData = async function (url) {
        try {
            const response = await fetch(url);
            return response;
        }
        catch (error) {
            console.error(`[fetch] ${error}`);
            throw error;
        }
    }

    return {

        text: url => {
            return getData(url).then(resp => resp.text());
        },

        JSON: url => {
            return getData(url).then(resp => resp.json());
        }
    }


})();

export default fetcher;
