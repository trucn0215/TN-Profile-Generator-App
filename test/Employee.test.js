const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("Can set name via constructor arguments", () => {
  // Arrange
  const name = "Alice";

  // Act
  const e = new Employee(name);

  // Assert
  expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  // Arrange
  const testValue = 100; // 100 can be anything string or number

  // Act
  const e = new Employee("Foo", testValue);

  // Assert
  expect(e.id).toBe(testValue);
});

// Test Email
test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.email).toBe(testValue);
});


// testing for new method getName()
test("Can get name via getName()", () => {
  
  // Arrange
  const testValue = "Alice";
  const e = new Employee(testValue);
  
  // Act
  const result = e.getName();
  
  // Assert
  expect(result).toBe(testValue);
});

test("Can get id via getId()", () => {
  
  // Arrange
  const testValue = 100;

  //Act
  const e = new Employee("Foo", testValue);

  // Assert
  expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", () => {
  // Arrange
  const testValue = "test@test.com";

  // Act
  const e = new Employee("Foo", 1, testValue);

  //Assert
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  // Arrange
  const testValue = "Employee";

  //Act
  const e = new Employee("Alice", 1, "test@test.com");

  //Assert
  expect(e.getRole()).toBe(testValue);
});
