import React from 'react'
const Todos = (props) => {
    const {todo} = props;
    return (
        <div className="todos">
            {todo.map(item =>
                 <li key={item.id} className={ item.done ? "list ok" : "list" } >
                 <p>{item.val}</p>
                 <div className="buttons">
                 <button className="done" onClick={ () => props.dt(item.id)}><i className="far fa-check-circle"></i></button>
                 <button className="delete" onClick={ () => props.del(item.id)}><i className="far fa-trash-alt"></i></button>
                 </div>
             </li>  )} 
        </div>
    )
}
export default Todos
