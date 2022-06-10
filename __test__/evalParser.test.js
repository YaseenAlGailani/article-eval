import evalParser from '../src/client/js/evalParser'

describe("Tesing data integrity", () => {

    test("testing evalParser() function throws error when status.code is not 0", () => {
        let data = {
            status:{code:1},
            sentence_list:[{text:"Hello"}],
            polarity:'test',
            subjectivity:'test'

        }
        expect(()=>{evalParser(data)}).toThrow();
    })
});