'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'; // MUI 的 Box 组件
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import theme from './utility/theme';
import Divider from '@mui/material/Divider';
import { PlusIcon } from './utility/icons';

import CheckIcon from '@mui/icons-material/Check';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Popover from '@mui/material/Popover';
import { getTodoListRequest, AddTodoListRequest, UpdateTodoListRequest } from '@/app/api/request'
import type { TodoResponse, AddTodoListRequestType, Request } from '@/app/api/request'

const MyStyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // 使用主题色
  padding: theme.spacing(3), // 使用主题间距等样式函数
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  borderRadius: '5px',
  width: '100%',
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily
})
);

const optionsType = [
  {
    label: '全部任务',
    value: 'all'
  },
  {
    label: '进行中',
    value: 'active'
  },
  {
    label: '已完成',
    value: 'completed'
  }
];
const optionsSort = [
  {
    label: 'Created at',
    value: 'createdAt'
  },
  {
    label: 'Due Date',
    value: 'dueDate'
  },
  {
    label: 'Task ID',
    value: 'order'
  }
];
export default function Home() {
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<any>(null)
  const dataRef = useRef<TodoResponse[]>([])
  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const [selectedIndexType, setSelectedIndexType] = useState(0);
  const openType = Boolean(anchorElType);

  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null);
  const [selectedIndexSort, setSelectedIndexSort] = useState(0);
  const openSort = Boolean(anchorElSort);
  const [dataLists, setDateLists] = useState<TodoResponse[]>([])
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [selectedDateTime, setSelectedDateTime] = useState<any>(dayjs());
  const [selectedObj, setSelectedObj] = useState<TodoResponse>();
  const getToDoLlistsFun = (params: Request) => {
    getTodoListRequest({ ...params }).then((res: any) => {
      console.log(res)
      if (res?.success) {
        setDateLists(res?.data?.items ?? [])
        dataRef.current = res?.data?.items ?? []
      }

    })
  }

  useEffect(() => {
    getToDoLlistsFun({})
  }, [])

  const addRow = () => {
    if (!addFlag) {
      setAddFlag(true)
      setTimeout(() => {
        inputRef?.current && inputRef?.current.focus()
      }, 500)
    }


  }
  const handleKeyDown = (event: any, obj?: TodoResponse) => {
    if (event.key === 'Enter') {
      console.log('Enter key was pressed', obj);
      const params: AddTodoListRequestType = {
        title: event.target.value
      }
      if (obj) {//修改
        params['id'] = obj.id
        UpdateTodoListRequest({ ...params }).then((res: any) => {
          if (res?.success) {
            getToDoLlistsFun({})
            setSuccess(true)
          }
        })
      } else {//增加

        AddTodoListRequest({ ...params }).then((res: any) => {
          if (res?.success) {
            getToDoLlistsFun({})
            handleBlur()
            setSuccess(true)
          }
        })
      }
    }
  };

  const completeFun = (obj: TodoResponse) => {
    if (obj?.completed) return;
    const params: AddTodoListRequestType = {
      id: obj.id,
      completed: true
    }
    UpdateTodoListRequest({ ...params }).then((res: any) => {
      if (res?.success) {
        getToDoLlistsFun({})
        setSuccess(true)
      }
    })
  }
  const handleBlur = () => {
    setAddFlag(false)
    if (inputRef.current) {
      inputRef.current.value = ''; // 清除输入框内容
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClose = () => {

    setAnchorEl(null);
    setSuccess(false)

  };

  const handleSaveDateTime = () => {
    if (!selectedObj?.id) return;
    const params = {
      id: selectedObj.id,
      dueDate: selectedDateTime
    }

    UpdateTodoListRequest({ ...params }).then((res: any) => {
      if (res?.success) {
        getToDoLlistsFun({})
        setSuccess(true)
      }
    })


  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const onChange = (event: any, obj: TodoResponse) => {
    setDateLists(dataLists.map((item: TodoResponse) => {
      if (item.id === obj.id) {
        return { ...obj, ...{ title: event.target.value } }
      }
      return { ...item }
    }))
  }
  const resetData = () => {
    setDateLists(dataRef.current)
  }
  return (
    <ThemeProvider theme={theme}>

      <div className={styles.page}>

        <MyStyledBox>

          <h2 style={theme.typography.h2}>Tasks</h2>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className={styles.btns}>
            <Button variant="outlined" size="small" startIcon={<PlusIcon />} onClick={() => addRow()}>
              New Task1111
            </Button>

            <Image alt="/" className={styles.cursor} width={12} height={12} src='/MenuOpenIcon.png' onClick={(event: any) => {
              setAnchorElType(event.currentTarget);
            }} />
            <Image alt="/" className={styles.cursor} width={12} height={12} src='/SyncAltIcon.png' onClick={(event: any) => {
              setAnchorElSort(event.currentTarget);
            }} />

          </div>
          <div className={styles.table}>
            <div className={styles.tbody} >
              <table cellSpacing="25" cellPadding="10" width='100%'>

                <thead className={styles.thead}>
                  <tr>
                    <th ><div className={styles.theadcell}>
                      <Image alt="/" width={16} height={14} src='/titleIcon.png' />
                      Task Title</div></th>
                    <th > <div className={styles.theadcell}>
                      <Image alt="/" width={14} height={14} src='/dueDateIcon.png' />
                      Due Date1</div></th>
                    <th><div className={styles.theadcell}>
                      <Image alt="/" width={14} height={14} src='/createdAtIcon.png' />
                      Created at</div> </th>
                    <th> <div className={styles.theadcell}>
                      <Image alt="/" width={15} height={15} src='/taskIdIcon.png' />
                      Task ID</div>  </th>
                  </tr>
                </thead>

                <tbody >
                  {dataLists?.length > 0 && dataLists.map((item: TodoResponse, index: number) => {
                    return <tr key={index}>

                      <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div className={`${styles.theadcellIcon} ${item?.completed ? styles.theadcellIconSelect : ''}`} onClick={() => completeFun(item)}></div>

                        <input onBlur={() => resetData()} onKeyDown={(event: any) => handleKeyDown(event, item)} className={`${styles.inputRef}`} value={item?.title} onChange={(event: any) => onChange(event, item)} />

                      </td>
                      <td onClick={(event: any) => {
                        setAnchorEl(event.currentTarget);
                        setSelectedDateTime(item?.dueDate ? dayjs(item?.dueDate) : null)
                        setSelectedObj(item)
                      }} style={{ color: dayjs(item?.dueDate) < dayjs() ? 'rgba(240, 91, 86, 1)' : 'white', cursor: 'pointer' }}>
                        {item?.dueDate ? <span >{dayjs(item?.dueDate).format('YYYY/MM/DD HH:mm')}</span> : <Image alt="/" width={14} height={14} src='/VectorGrey.png' />}
                      </td>
                      <td className={styles.grey}>{dayjs(item?.createdAt).format('YYYY/MM/DD HH:mm')}</td>
                      <td className={styles.grey}>{item?.id}</td>
                    </tr>
                  })}
                  {
                    addFlag && <tr key='add'>

                      <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><div className={`${styles.theadcellIconHover}`} ></div>

                        <input ref={inputRef} onKeyDown={(event: any) => handleKeyDown(event)}
                          onBlur={handleBlur} className={`${styles.inputRef}`} placeholder='輸入後按下Enter進行儲存' />
                      </td>
                      <td >{<Image alt='/' width={16} height={16} src='/VectorGrey.png' />}

                      </td>
                      <td className={styles.grey}>{dayjs().format('YYYY/MM/DD HH:mm')}</td>
                      <td className={styles.grey}></td>
                    </tr>
                  }
                </tbody>
              </table>
              <div className={`${styles.grey} ${styles.addBottomBtn}`} onClick={() => addRow()}><span>New Task</span></div>
            </div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}  >

              <DateTimePicker value={selectedDateTime}
                onAccept={() => {
                  handleSaveDateTime()
                }}
                onChange={(newValue: any) => {
                  setSelectedDateTime(newValue)
                }} label="请选择时间" format="YYYY/MM/DD HH:mm" />

            </LocalizationProvider>
          </Popover>
          {success &&
            <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Alert
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" sx={{ width: '100%' }} />,
                }}
              >
                保存成功
              </Alert>
            </Snackbar>

          }
          <Menu
            id="lock-menu"
            anchorEl={anchorElSort}
            open={openSort}
            onClose={() => setAnchorElSort(null)}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            {optionsSort.map((option: any, index: number) => (
              <MenuItem
                key={option.value}
                style={{ width: '160px', display: 'flex', justifyContent: 'space-between', color: index === selectedIndexSort ? '#007aff' : 'white' }}
                selected={index === selectedIndexSort}
                onClick={() => {
                  setSelectedIndexSort(index);
                  setAnchorElSort(null);
                  getToDoLlistsFun({ sortBy: option.value, status: optionsType[selectedIndexType]?.value ?? 'all' })
                }}
              >
                {option.label}
                {index === selectedIndexSort && <CheckIcon style={{ color: '#007aff' }} />}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            id="lock-menu"
            anchorEl={anchorElType}
            open={openType}
            onClose={() => setAnchorElType(null)}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            {optionsType.map((option: any, index: number) => (
              <MenuItem
                key={option.value}
                style={{ width: '160px', display: 'flex', justifyContent: 'space-between', color: index === selectedIndexType ? '#007aff' : 'white' }}
                selected={index === selectedIndexType}
                onClick={() => {
                  setSelectedIndexType(index);
                  setAnchorElType(null);
                  getToDoLlistsFun({ status: option.value, sortBy: optionsSort[selectedIndexSort]?.value ?? 'createdAt' })
                }}
              >
                {option.label}
                {index === selectedIndexType && <CheckIcon style={{ color: '#007aff' }} />}
              </MenuItem>
            ))}
          </Menu>

        </MyStyledBox>

      </div>
    </ThemeProvider>
  );
}
