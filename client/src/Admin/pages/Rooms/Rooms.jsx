import React, { useEffect, useState, useRef } from 'react';
import { Button, useToast, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillFileExcel } from 'react-icons/ai';
import { useDownloadExcel } from 'react-export-table-to-excel';
import {FcRefresh} from 'react-icons/fc'
import AdminHeader from '../Users/AdminHeader';
import { getBooking,deleteBooking } from '../../slices/bookingactionSlice';
const Rooms = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getRooms');
      dispatch(getRoom(response.data));
    } catch (error) {
      toast({
        description: `${error}`,
        status: 'error',
        position: 'top',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update filtered users whenever the searchQuery or users list changes
    const filtered = rooms.filter(
      (room) =>
        room.roomno.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.gender.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [searchQuery, rooms]);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8000/deleteRoom/' + id)
      .then((res) => {
        dispatch(deleteRoom({ id }));
        fetchData();
        toast({
          description: 'success',
          status: 'success',
          position: 'bottom',
          duration: 3000,
        });
      })
      .catch((err) =>
        toast({
          description: `${err}`,
          status: 'error',
          position: 'bottom',
          duration: 3000,
        })
      )
     
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Rooms data',
    sheet: 'Rooms',
  });

  return (
    <div className='mb-8'>
      <div className='border-b border-slate-400 py-2'>
        <AdminHeader />
      </div>
      <div>
        <h1 className=' ml-6 text-slate-900 md:text-2xl text-xl font-extrabold mt-10'>
          Rooms
        </h1>
      </div>
      <div className='mt-3'>
        <div className='md:justify-between md:flex block items-center'>
          <div className='md:ml-6 flex items-center'>
            <Link className='mx-2' to={'/addroom'}>
              <Button
                leftIcon={<IoMdAddCircle />}
                colorScheme='green'
                variant='solid'
              >
                Add
              </Button>
            </Link>
            <AiFillFileExcel
              className='text-4xl text-green-600 cursor-pointer'
              onClick={onDownload}
            />
            <FcRefresh className='text-4xl cursor-pointer' onClick={()=>fetchData()}/>
          </div>
         <div className='mx-3 mr-9'>
            <input
              type='date'
              className='input'
              placeholder='Search by roomno'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-col overflow-x-auto shadow-2xl bg-white md:mx-8 md:px-3 px-1 mx-1 md:my-4 mb-8 rounded-md py-4'>
            <div className='sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-x-auto'>
                  <table
                    ref={tableRef}
                    className='min-w-full text-left text-sm font-light'
                  >
                    <thead className='border-b font-medium dark:border-neutral-500'>
                      <tr>
                        <th scope='col' className='px-6 py-4'>
                          #
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Room Number
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Gender
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map((room, index) => {
                        return (
                          <tr key={room.id} className='border-b '>
                            <td>{index + 1}</td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {room.roomno}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {room.gender}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {room.sharingtype}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4 flex gap-2'>
                              <Tooltip label='Edit'>
                                <Link to={`/editroom/${room.id}`}>
                                  <AiFillEdit className='text-orange-500 font-bold text-xl cursor-pointer' />
                                </Link>
                              </Tooltip>
                            </td>
                            <td>
                              <AiFillDelete
                                className='text-red-500 cursor-pointer text-xl font-bold'
                                onClick={() => handleDelete(room.id)}
                              />
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
