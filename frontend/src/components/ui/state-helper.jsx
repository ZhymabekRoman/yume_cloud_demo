import React, { useState, useEffect } from 'react';

import { Loading } from "@/components/ui/loading";
import PropTypes from "prop-types";

export const LOADING_STATE = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  };

export const StateHelper = ({ state, children }) => {
    const [successContent, setSuccessContent] = useState(null);
    const [errorContent, setErrorContent] = useState(null);

    useEffect(() => {
      const childrenArray = React.Children.toArray(children);
      setSuccessContent(childrenArray.find((child) => child.type === SuccessStateContent));
      setErrorContent(childrenArray.find((child) => child.type === ErrorStateContent));
    }, [children]);
  return (
    <>
      {state === LOADING_STATE.LOADING ? (
        <Loading />
      ) : state === LOADING_STATE.SUCCESS ? (
        successContent
      ) : state === LOADING_STATE.ERROR ? (
        <ErrorStateContent>
          {errorContent || ErrorStateContent(<>Что-то пошло не так</>)}
        </ErrorStateContent>
      ) : null}
    </>
  );
};

StateHelper.propTypes = {
  state: PropTypes.oneOf(Object.values(LOADING_STATE)).isRequired,
  children: PropTypes.node.isRequired,
};

export function SuccessStateContent({ children }) {
  return <>{children}</>;
}

SuccessStateContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ErrorStateContent({ children }) {
  return <>{children}</>;
}

ErrorStateContent.propTypes = {
  children: PropTypes.node.isRequired,
};

SuccessStateContent.displayName = 'SuccessStateContent';
ErrorStateContent.displayName = 'ErrorStateContent';