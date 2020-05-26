class Category {
    constructor(category, username) {
        this.category = category;
        this.username = username;
        this.todolist = db.collection('todolist');
        this.unsub;
    }

    async addTodo(todo) {
        //format a chat object
        const now = new Date();
        const todoobj = {
            todo,
            created_by: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now),
            category: this.category,
            finished: false
        };
        const response = await this.todolist.add(todoobj);
        return response;
    }

    getTodos(callback) {
        this.unsub = this.todolist
            .where('category', '==', this.category)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the ui
                        callback(change.doc.data(), change.doc.id);
                    }
                });
            });
    }

    updateName(newName) {
        this.username = newName;
        localStorage.setItem('username', newName);
    }

    updateCategory(newCategory) {
        this.category = newCategory;
        if (this.unsub) {
            this.unsub();
        }
        localStorage.setItem('category', newCategory);
    }

    deleteTodos(id, callback) {
        this.todolist.doc(id).delete()
            .then(() => callback(id))
            .catch(err => console.log(err));
    }

    changeStatus(id, callback) {
        var currStatus;
        this.todolist.doc(id).get()
            .then((doc) => {
                currStatus = doc.data().finished;
                this.todolist.doc(id).update({
                    finished: !currStatus
                }).then(() => {
                    callback(id, !currStatus);
                });
            }).catch(err => console.log(err));
    }
}