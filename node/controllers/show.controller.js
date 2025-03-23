import { shows } from "../data/mongodb";

export default (req, res) => {
    let status = 500;
    let send = "Error";
    if (req.method === "GET" && typeof (req.params.id) === "undefined") {
        status = 200;
        send = shows;
    }
    if (req.method === 'GET' && typeof (req.params.id) != "undefined") {
        if (isNaN(Number(req.params.id)) || i > shows.length || i < 0) {
            status = 400;
            send = "פרמטרים לא תקינים";
        } else {
            status = 200;
            send = shows.find(a => a.id == req.params.id);
        }
    }
    if (req.method === "POST")
        if (req.params.name === "undefind") {
            status = 400;
            send = "פרמטרים לא תקינים";
        } else {
            const show = { id: shows[shows.length - 1].id + 1, name: (req.params.name).substring(1, (req.params.name).length - 1) };
            shows.push(show);
            /// צריך להיות פה פונקציה ששומרת למסד נתונים
            status = 200;
            send = shows;
        }
    if (req.method === 'PUT') {
        const n = JSON.parse(req.params.update);
        if (n.id === "undefined" || n.name === "undefined") {
            status = 400;
            send = "פרמטרים לא תקינים";
        }
        else {
            shows.map(show => {
                if (show.id === n.id)
                    show.name = n.name;
            });
            /// צריך להיות פה פונקציה ששומרת למסד נתונים
            status = 200;
            send = shows;
        }
    }
    if (req.method === "DELETE") {
        const i = Number(req.params.id);
        if (isNaN(Number(req.params.id)) || i > shows.length || i < 0) {
            status = 400;
            send = "פרמטרים לא תקינים";
        }
        else {
            const index = shows.findIndex(show => show.id === i);
            shows.splice(index, 1);
            /// צריך להיות פה פונקציה ששומרת למסד נתונים
            status = 200;
            send = shows;
        }
    }
    res.status(status).send(send);
};