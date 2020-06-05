class TodoUI {
    constructor(list) {
        this.list = list;
    }

    clear() {
        this.list.innerHTML = '';
    }

    render(data, id) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        );
        const status = data.finished ? 'Completed' : '<span style="color: red">Not Completed Yet</span>';
        const html = `
            <li class="list-group-item" data-id="${id}">
                <span class="username">${data.created_by}</span>
                <span class="message">${data.todo}</span>
                <button class="btn btn-danger btn-sm my-2 float-right">${data.finished ? 'Mark as not completed' : "Mark as completed"}</button>
                <div class="time">${when}</div>
                <div class="'finished">${status}</div>
                <!-- <input type="checkbox" class="float-left"> -->
                <i class="far fa-trash-alt float-right delete"></i>
            </li>  
        `;
        this.list.innerHTML += html;
    }

    remove(id) {
        const items = document.querySelectorAll('.todo-list li');
        items.forEach(item => {
            if (item.getAttribute('data-id') === id) {
                item.remove();
            }
        });
    }

    changeUIStatus(id, status) {
        const items = document.querySelectorAll('.todo-list li');
        items.forEach(item => {
            if (item.getAttribute('data-id') === id) {
                if (status) {
                    item.children[2].innerHTML = 'Mark as not completed';
                    item.children[4].innerHTML = 'Completed';
                    item.children[4].style.color = 'white';
                } else {
                    item.children[2].innerHTML = 'Mark as completed';
                    item.children[4].innerHTML = 'Not Completed Yet';
                    item.children[4].style.color = 'red';
                }
            }
        });
    }
}