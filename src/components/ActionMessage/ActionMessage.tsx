import { useState, useEffect } from "react";

import styles from "./ActionMessage.module.css";

interface IActionMessage {
    text: string;
}

const ActionMessage = ({
  text,
}: IActionMessage) => {

    const [show, setShow] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
  
      return () => {
        clearTimeout(timer);
      };
      // eslint-disable-next-line
    }, []);
  
    return show ? (
      <div className={styles.text}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    ) : ( null );
};

export default ActionMessage