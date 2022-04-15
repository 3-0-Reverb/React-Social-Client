import { fireEvent, render } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import Notifications from "./Notifications";
import { screen } from "@testing-library/dom"
import { util } from "../profile/AllFollowings";


describe ('Notification testing', () =>{

  it('should show Notifications', async ()=>{

    const { getByPlaceholderText } = render(
      <Provider store={store}>
          <BrowserRouter>
            <Notifications loggedIn={""}/>
          </BrowserRouter>
      </Provider>
    );
    //const notifications = jest.spyOn(util, 'notifications');
    //expect(getByPlaceholderText("Notifications")).toBeInTheDocument();
  })

    it ('should show Notifications ', async () => {

        const initialState: any [] =  {
            id: 0,
            title: "",
            postText: "",
            embedURL: "",
            date: "",
            profile: {
              id: 0,
              first_name: "",
              last_name: "",
              birthday: "",
              hobby: "",
              location: "",
              profile_img: "",
              header_img: "",
              about_me: ""
            },
            comments: []
          }

          const dummyFunc = jest.fn();
          const alertMock = jest.spyOn(window,'alert').mockImplementation();

          let notificationComponent = (
          <>
            <Notifications
                id={""}
                show={true}
                onHide={() => { } } 
            />
                
            </>);

        const { getByText, getByTestId } = render(
            <Provider store={store}>
              <BrowserRouter>
                <Notifications loggedIn={""}/>
                {notificationComponent}
                </BrowserRouter>
            </Provider>
          );
          
          expect(screen.getByTestId("notifications-modal")).toHaveTextContent("liked your post!");
          expect(screen.getByTestId("notifications-modal")).toHaveTextContent("commented on your post!");
          

    });

    it ('should show Notifications ', async () => {

        const dummyFunc = jest.fn();

          let notificationComponent = (
          <>
            <Notifications
                id={""}
                show={true}
                onHide={() => { } } 
            />
                
            </>);

        const { getByText, getByTestId } = render(
            <Provider store={store}>
              <BrowserRouter>
                <Notifications loggedIn={""}/>
                {notificationComponent}
                </BrowserRouter>
            </Provider>
          );

          const toggleModal = getByTestId("btn bi bi-bell");
          fireEvent.click(toggleModal);
          expect(dummyFunc).toBeCalled();
            
        //   expect(screen.getByTestId("notifications-modal")).toHaveTextContent("liked your post!");
        //   expect(screen.getByTestId("notifications-modal")).toHaveTextContent("commented on your post!");
    })
});