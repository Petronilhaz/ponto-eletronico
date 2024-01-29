import Users from "../../DataBase/users";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as S from "./Contador.styles";

const Contador = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState(new Date());
  const [time, setTime] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [accessControl, setAccessControl] = useState([]);

  const currentTime = {
    hour: data.getHours(),
    minute: data.getMinutes(),
    seconds: data.getSeconds(),
    day: data.getDay(),
    month: data.getMonth(),
    year: data.getFullYear(),
  };

  const { hour, minute, seconds, day, month, year } = currentTime;

  useEffect(() => {
    setInterval(() => {
      setData(new Date());
    }, 1000);
  }, [data, currentUser]);

  function onSubmit(data, event) {
    event.target.reset();
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].matricula === data.matricula) {
        setCurrentUser(Users[i]);
      } else {
        let e = "Usuário não encontrado ";
      }
    }
    setAccessControl((prevState) => [
      ...prevState,
      {
        user: currentUser,
        fullDate: `${day}:${month + 1}:${year}`,
        date: {
          day: day,
          month: month + 1,
          year: year,
        },
        fullTime: `${hour}:${minute}:${seconds}`,
        time: {
          hour: hour,
          minute: minute,
          seconds: seconds,
        },
      },
    ]);

    setTimeout(() => {
      setCurrentUser(undefined);
    }, 3000);
  }

  function renderTime(time) {
    return time < 10 ? "0" + time : time;
  }

  function nameScreenTime(name) {
    setTimeout(() => {
      name = "";
    }, 100);
    return name;
  }

  useEffect(() => {
    console.log("Usuário: ", currentUser);
    console.log("Access Control: ", accessControl);
  }, [accessControl, currentUser]);

  return (
    <>
      <Box sx={S.FlexContainer}>
        <Box sx={S.Box}>
          <S.Relogio>{renderTime(hour)}</S.Relogio>
          <S.Relogio>:</S.Relogio>
          <S.Relogio>{renderTime(minute)}</S.Relogio>
          <S.Relogio>:</S.Relogio>
          <S.Relogio>{renderTime(seconds)}</S.Relogio>
        </Box>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{
              width: "100%",
              margin: "10px 0",
            }}
            placeholder="Matricula ou CPF do funcionário"
            {...register("matricula")}
          />
          <Button variant="contained" sx={S.Button} type="submit">
            Registrar
          </Button>
        </S.Form>
        {currentUser !== undefined ? (
          <h2>{nameScreenTime(currentUser.nome)}</h2>
        ) : null}
      </Box>
    </>
  );
};

export default Contador;
