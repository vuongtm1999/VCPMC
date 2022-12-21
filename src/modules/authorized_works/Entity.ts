class AuthorizedWork {

    id: string = '';
    name: string = '';
    singer: string = '';
    code: string = '';
    author: string = '';
    date_created: string = '';
    status: string = '';

    constructor(work?: Partial<AuthorizedWork>) {
        if (!work) {
            return;
        }
        Object.assign(this, work);
    }
}



export default AuthorizedWork;