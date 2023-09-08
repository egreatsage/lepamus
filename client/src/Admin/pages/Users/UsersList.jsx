import React, { useEffect, useState, useRef } from 'react';
import { Button, useToast, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from '../../../slices/userslistslice';
import AdminHeader from '../../components/AdminHeader';
import { AiFillDelete, AiFillEdit, AiFillFileExcel } from 'react-icons/ai';
import { useDownloadExcel } from 'react-export-table-to-excel';
import {FcRefresh} from 'react-icons/fc'
const UsersList = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUsers');
      dispatch(getUser(response.data));
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
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8000/deleteUser/' + id)
      .then((res) => {
        dispatch(deleteUser({ id }));
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
      .finally(() => {
        // After the delete operation, refetch the data to refresh the list
        fetchData();
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users data',
    sheet: 'Users',
  });

  return (
    <div className='mb-8'>
      <div className='border-b border-slate-400 py-2'>
        <AdminHeader />
      </div>
      <div>
        <h1 className=' ml-6 text-slate-900 md:text-2xl text-xl font-extrabold mt-10'>
          Users Details
        </h1>
      </div>
      <div className='mt-3'>
        <div className='md:justify-between md:flex block items-center'>
          <div className='md:ml-6 flex items-center'>
            <Link className='mx-2' to={'/adduser'}>
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
              type='search'
              className='input'
              placeholder='Search by first/last name'
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
                          firstname
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          lastname
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          email
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          gender
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          phonenumber
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          gpname
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          gpcontact
                        </th>
                        <th scope='col' className='px-6 py-4'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => {
                        return (
                          <tr key={user.id} className='border-b '>
                            <td>{index + 1}</td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.firstname}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.lastname}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.email}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.gender}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.phonenumber}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.gpname}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.gpcontact}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              {user.createdAt}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4 flex gap-2'>
                              <Tooltip label='Edit'>
                                <Link to={`/edituser/${user.id}`}>
                                  <AiFillEdit className='text-orange-500 font-bold text-xl cursor-pointer' />
                                </Link>
                              </Tooltip>
                            </td>
                            <td>
                              <AiFillDelete
                                className='text-red-500 cursor-pointer text-xl font-bold'
                                onClick={() => handleDelete(user.id)}
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

export default UsersList;
