// Mosh shows name?: string as optional-property syntax, then explains
// that an employee should normally have a name.
let employeePreview: {
  id: number;
  name?: string;
} = {
  id: 1,
};
employeePreview.name = "Mosh";

let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "Mosh",
  retire: (date: Date) => {
    console.log(date);
  },
};

employee.retire(new Date());

export {};
