function evalParser(data) {
    try {


        if (data.status.code > 0) {
            throw (data.status.msg);
        }

        let polarity = '';
        switch (data.score_tag) {
            case 'P+':
                polarity = 'Strong positive';
                break;
            case 'P':
                polarity = 'Positive';
                break;
            case 'NEU':
                polarity = 'Neutral';
                break;
            case 'N':
                polarity = 'Negative';
                break;
            case 'N+':
                polarity = 'Strong negative';
                break;
            case 'NONE':
                polarity = 'Without polarity';
                break;
        }

        let sentences = '';

        for (let i = 0; i < 3 && i < data.sentence_list.length; i++) {
            sentences += data.sentence_list[i].text;
        }

        sentences = sentences.replace(/(\.)([A-Z])/g, ". $2");

        return {
            polarity,
            subjectivity: data.subjectivity.charAt(0).concat(data.subjectivity.substring(1).toLowerCase()),
            sentences
        }
    }
    catch (error) {
        console.log('[evalParser] ', error);
        throw error;
    }
}

export default evalParser;