import type { Question } from "../types/game";

export const mockGameData: Question[] = [
  {
    id: 1,
    question: "¿Qué es lo primero que haces al despertar?",
    answers: [
      { id: 101, text: "Ver el celular", points: 35, revealed: false },
      { id: 102, text: "Ir al baño", points: 25, revealed: false },
      { id: 103, text: "Apagar la alarma", points: 15, revealed: false },
      { id: 104, text: "Tallarse los ojos", points: 10, revealed: false },
      { id: 105, text: "Tomar agua", points: 8, revealed: false },
      { id: 106, text: "Besar a la pareja", points: 7, revealed: false },
    ],
  },
  {
    id: 2,
    question: "Lugar donde no te gustaría encontrarte a tu ex",
    answers: [
      { id: 201, text: "En una cita", points: 40, revealed: false },
      { id: 202, text: "En el cine", points: 20, revealed: false },
      { id: 203, text: "En una fiesta", points: 15, revealed: false },
      { id: 204, text: "En el trabajo", points: 10, revealed: false },
    ],
  },
];