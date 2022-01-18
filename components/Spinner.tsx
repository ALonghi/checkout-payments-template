import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: mediumspringgreen;
`;

const Spinner = ({isLoading}) => {
    return (<ClipLoader loading={isLoading} css={override} size={100}/>)
}

export default Spinner
