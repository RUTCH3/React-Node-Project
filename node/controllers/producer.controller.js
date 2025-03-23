import { producers } from "../data/mongodb";

export default (req, res) => {
    let status = 500;
    let send = "Error";
    if (req.method === 'GET' && typeof (req.params.id) != "undefined") {
        if (isNaN(Number(req.params.id)) || i > producers.length || i < 0) {
            status = 400;
            send = "פרמטרים לא תקינים";
        } else {
            status = 200;
            /// פונקציה מהקובץ של מונגו 
            send = producers.find(a => a.id == Number(req.params.id));
        }
    }
    if (req.method === "POST")
        if (req.params.name === "undefind") {
            status = 400;
            send = "פרמטרים לא תקינים";
        } else {
            const show = { id: producers[producers.length - 1].id + 1, name: (req.params.name).substring(1, (req.params.name).length - 1) };
            producers.push(show);
            /// צריך להיות פה פונקציה ששומרת למסד נתונים
            status = 200;
            send = producers;
        }
    if (req.method === 'PUT') {
        const n = JSON.parse(req.params.update);
        if (n.id === "undefined" || n.name === "undefined") {
            status = 400;
            send = "פרמטרים לא תקינים";
        }
        else {
            producers.map(show => {
                if (show.id === n.id)
                    show.name = n.name;
            });
            SaveToDB();
            /// צריך להיות פה פונקציה ששומרת למסד נתונים
            status = 200;
            send = producers;
        }
    }
    res.status(status).send(send);
}