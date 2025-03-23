import { createContext } from "react";
import { Producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type ContextType = {
    producers: Producer[] | undefined,
    updateProducer: (oldTask: Producer, newTask: Producer) => void,
    addProducer: () => void
}

export const TodoContext = createContext<Partial<ContextType>>({});

// קומפוננטה שתנהל את עניני הקונטקסט
export const TodoProvider = (props: any) => {

    const { data: producers, error, loading, request } = useHttp<Producer[]>('/tasks');

    const contextValue: ContextType = {
        producers,
        updateProducer(oldTask: Producer, newTask: Producer) {
            oldTask;
            newTask;
            // const newTasks = todos.map(todo => todo === oldTask ? newTask : todo);
            // setTodos(newTasks);
        },
        addProducer() {
           request();
        }
        
    };

    return <TodoContext.Provider value={contextValue}> 
        {/* שם שמור שכולל את התוכן שנשלח לקומפוננטה מבחוץ */}
        { loading && 'Loading...' }
        { error }
        { !loading && !error && props.children }
    </TodoContext.Provider>
}