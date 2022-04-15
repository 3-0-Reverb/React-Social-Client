import { fireEvent, render } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import SubmitComment from '../comment/SubmitComment';
import Discover from './Discover';
import SearchBarGroup from './SearchBarGroup';

describe ('SubmitDiscover testing', () =>{

    it ('should show Post to Reverb', async () => {

      const Comment = {
            commentId: "",
            commentText: "text",
            date: "",
            profile: {  
                postId: 0,
                first_name: "",
                last_name: "",
                birthday: "",
                hobby: "",
                location: "",
                profile_img: "",
                header_img: "",
                about_me: ""
              }
          }

          const dummyFunc = jest.fn();

          const { getByText, getByTestId } = render(
            <Provider store={store}>
              <BrowserRouter>
                <SubmitComment
                  setComment={() => { }}
                  comment={Comment}
                  show={true}
                  dispatchComment={dummyFunc}
                  onHide={() => { }}
                  postId={0} />
                <Discover isGroup={false} />
              </BrowserRouter>
              <SearchBarGroup />
            </Provider>
          );
          
          expect(getByText("Leave Comment")).toBeInTheDocument();

          const button = getByTestId("submitCommentButton");
          fireEvent.click(button);
          expect(dummyFunc).toBeCalled();
    })

})

