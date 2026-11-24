type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  if (id === 0) {
    return null;
  }

  if (id === 1) {
    return { birthday: new Date() };
  }

  return undefined;
}

const customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

export {};
