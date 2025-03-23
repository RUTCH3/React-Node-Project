import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const serverInstance = axios.create({
    baseURL: 'http://localhost:8000',
})

// יצירה של custom hook
// משמש לשימוש חוזר בלוגיקה של קומפוננטות
// הקונבנציה - מתחיל  במילה use
// יכול להכיל את כל ההוקים השונים
// כאן יש מימוש להוק עבור קריאות לשרת
export function useHttp<T>(url: string, method: HttpMethod = 'get') {
    // אתחול של משתנה המציין אם הקריאה בתהליך התרחשות
    const [loading, setLoading] = useState(false);
    // מסמן האם יש שגיאה
    const [error, setError] = useState('');
    // משתנה בשביל להכיל את הדטה שיחזור.
    // יש כאן שימוש בגנריות כדי להגדיר את סוג הדטה שיחזור
    const [data, setData] = useState<T>();

    // פונקציה בשביל לבצע קריאות שרת בפועל. הפונקציה מקבלת
    // url - כתובת הקריאה
    // סוג הקריאה, וגוף הקריאה - אופציונאלי כי יש אותו רק בקריאות post / put
    const request = useCallback(async (body?: any) => {
        setLoading(true);
        setError('');
        try {
            const result = await serverInstance[method]<T>(url, body);
            setLoading(false);
            setData(result.data as T);
        } catch (error) {
            setError('error occures try again later');
            setLoading(false);
            console.log('error while fetching', error);
        }        
    }, [])

    // תזמון של הקריאה אוטומטית בהתחלה, רק במקרה של פונקציית get
    useEffect(() => {
        if (method === 'get') {
            request();
        }
    }, []);

    // custom hook צריך תמיד להחזיר את המשתנים שהקומפוננטה תצטרך להשתמש בהם
    return { loading, error, data, request };
}