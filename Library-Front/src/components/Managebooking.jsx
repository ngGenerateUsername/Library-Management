import { useEffect, useRef, useState } from "react";
import { Flex, Spinner, useToast, Select, Button, Input } from '@chakra-ui/react';
import axios from "axios";
import { FaPlus } from 'react-icons/fa';
import { HandlePostRequest } from "../Helpers/HandlePostRequest";
import { Hoc } from "../HOC/hoc";

const ManageBooking = () => {

  const [borrowed, setBorrowed] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [cancelPressed, setCancelPressed] = useState(false);

  const [notBorrowed, setNotBorrowed] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  //for dropdown
  const selectedSubs = useRef('');
  const selectedBook = useRef('');
  const selectedDateBack = useRef('');

  const toast = useToast()

  useEffect(() => {

    //define a function to fetch borrowed books
    const fetchAllBooks = async () => {
      setIsPending(true);

      try {
        const { data: response } = await axios.get("http://localhost:8080/book");
        const borrowedData = response.filter(item => !item.available);
        setBorrowed(borrowedData);

        const notBorrowedData = response.filter(item => item.available);
        setNotBorrowed(notBorrowedData);

      } catch (error) {
        console.error(error.message);
      }
      setIsPending(false);
    }
    //fetch subscribers
    const fetchSubscribers = async () => {
      setIsPending(true);

      try {
        const { data: response } = await axios.get("http://localhost:8080/subscriber");
        setSubscribers(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    }


    fetchAllBooks();
    fetchSubscribers();
    console.log('im refreshed here!');
  }, [cancelPressed]

  );

  //cancel
  const handleCancel = (item) => {
    axios.get(`http://localhost:8080/booking/${item.isbn}`).then(
      () => {
        toast({
          title: 'Cancel booking.',
          description: `The book ${item.title} has been return by ${item.fname}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        const newBorrowed = borrowed.filter(borrowItem => borrowItem.isbn != item.isbn)
        setBorrowed(newBorrowed);
        setNotBorrowed([...notBorrowed,item]);

        console.log(item);
      }
    ).catch((error) => {
      toast({
        title: 'Server Error.',
        description: "Error:" + error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    });
  }

  //add new Booking
  const addNewBooking = async () => {
    if (selectedBook.current == '' || selectedSubs.current == '' | selectedDateBack.current == '') {
      toast({
        title: 'Empty field',
        description: 'fill the inputs please!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return;
    }
    try {
      await HandlePostRequest("http://localhost:8080/booking", {
        "id_sub": Number(selectedSubs.current),
        "id_book": Number(selectedBook.current),
        "giveBack": selectedDateBack.current
      })
      toast({
        title: 'Succefully added!',
        description: `new booking added to the list`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setCancelPressed(!cancelPressed);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error while adding new booking',
        description: "Error:" + error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }


  }


  return (
    <>
      {/* <h1 className="text-left"> Manage Borrowed Books</h1> */}

      <div className="content">
        <div className="container-fluid">


          <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="col-md-4">
                <Select placeholder='select subscriber' onChange={(e) => { selectedSubs.current = e.target.value; }}>
                  {subscribers.map(item => (
                    <option key={item.cin} value={item.cin}>{item.fname} {item.lname}</option>
                  ))}

                </Select>
              </div>

              <div className="col-md-4">
                <Select placeholder='select book' onChange={(e) => { selectedBook.current = e.target.value; }}>
                  {notBorrowed.map(item => (
                    <option key={item.isbn} value={item.isbn}>{item.title}</option>
                  ))}
                </Select>
              </div>

              <div className="col-md-4">
                <Input type="date" onChange={(e) => { selectedDateBack.current = e.target.value }}></Input>
              </div>
            </div>
            <div className="row ml-2">
              <div className="col-md-4">
                <Button colorScheme='teal' onClick={addNewBooking} >New Booking <FaPlus style={{ marginLeft: '8px' }} /></Button>
              </div>
            </div>

          </div>
          <br />


          <div className="section">


            <div className="row">
              <div className="col-6 col-md-3" />
              <div className="col-6 col-md-6">
                <br /><br />

                <h2 style={{ textAlign: 'left', fontWeight: 300, color: 'rgb(2, 23, 5)', fontSize: '22px' }}>
                  List of borrowed books:
                  {isPending &&
                    <Flex justify="center" marginTop={200}>
                      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='green.500' size='xl' />
                    </Flex>
                  }
                </h2>
                <hr />
              </div>
              <div className="col-6 col-md-3" />
            </div>
            <br />
          </div>
          <div className="section">
            <div className="row">
              <div className="col-6 col-md-2" />
              <div className="col-6 col-md-8">
                {/* boucli for hne*/}
                {borrowed.map(item => (
                  <div key={item.isbn} className="card" style={{ backgroundColor: '#326f59' }}>
                    <div className="card-header card-header-success" style={{ backgroundColor: '#B7E4C7' }}>
                      <div className="row">
                        <div className="col-md-10">
                          <h4 className="card-title "> <b>{item.title} <span style={{ fontSize: '20px' }}>(isbn: {item.isbn} )</span></b> </h4>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-4" style={{ marginTop: '-25px' }}><br /> <p style={{ fontSize: '13px' }}>Author:&nbsp;<span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{item.author}</span></p>
                              </div>
                              <div className="col-md-8">
                                <p className="card-category" style={{ color: 'rgb(0, 0, 0)' }}> <br />
                                  Name: {item.subscriber.fname}  {item.subscriber.lname}<br />
                                  address: {item.subscriber.address}<br />
                                  Expiration Date: {item.giveBack}<br />
                                </p><br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2"><br /><br /><br />
                          <button className="btn btn-success" onClick={() => { handleCancel(item) }}>Give Back</button>

                        </div>
                      </div>
                    </div>
                    <div className="card-body"></div>
                  </div>
                ))}

              </div>
              <div className="col-6 col-md-2" />
            </div>
            <br />
          </div>
        </div>
        {/* what you looking to do*/}

        <br /><br />
        <br />
        {/* li ta7ti tsakkar el content sakarha ekhir el page*/}
      </div>
    </>
  );

}


 
export default Hoc(ManageBooking) ;
