class Record {

    id: string = '';
    name: string = '';
    singer: string = '';
    code: string = '';
    author: string = '';
    date_created: string = '';
    status: string = '';

    constructor(record?: Partial<Record>) {
        if (!record) {
            return;
        }
        Object.assign(this, record);
    }
}



export default Record;