// See https://aka.ms/new-console-template for more information
Console.WriteLine("My name  is Aathil");
Console.WriteLine("I am learning C#");
Console.WriteLine("I will become a .NET developer");


int age = 22;
long population = 8000000000L;
float temperature = 36.5f;
double height = 5.8;
decimal salary = 50000.50m;
bool isStudent = true;
char grade = 'A';

Console.WriteLine($"Age: {age}");
Console.WriteLine($"Population: {population}");
Console.WriteLine($"Temperature: {temperature}");
Console.WriteLine($"Height: {height}");
Console.WriteLine($"Salary: {salary}");
Console.WriteLine($"Is Student: {isStudent}");
Console.WriteLine($"Grade: {grade}");

Console.WriteLine();

Console.WriteLine($"Age type: {age.GetType()}");
Console.WriteLine($"Population type: {population.GetType()}");
Console.WriteLine($"Temperature type: {temperature.GetType()}");
Console.WriteLine($"Height type: {height.GetType()}");
Console.WriteLine($"Salary type: {salary.GetType()}");
Console.WriteLine($"IsStudent type: {isStudent.GetType()}");
Console.WriteLine($"Grade type: {grade.GetType()}");

int a = 10;
int b = 3;

Console.WriteLine("sum is " + a + b);
Console.WriteLine($"difference is  {a - b}");
Console.WriteLine($"multiplication is {a * b}");
Console.WriteLine($"division is {a / b}");
Console.WriteLine($"reminder is {a % b}");

a = 10;
b = 3;

Console.WriteLine(a / b);


int number = 20;

number += 5;
Console.WriteLine(number); // 25

number -= 10;
Console.WriteLine(number); // 15

number *= 2;
Console.WriteLine(number); // 30

number /= 5;
Console.WriteLine(number); // 6

number %= 4;
Console.WriteLine(number); // 2


Console.WriteLine(1 == '1');

string firstName = "Aathil";
string lastName = "Ali";

Console.WriteLine($"Full Name: {firstName} {lastName}");
Console.WriteLine($"Length: {firstName.Length}");
Console.WriteLine($"Uppercase: {firstName.ToUpper()}");
Console.WriteLine($"Lowercase: {firstName.ToLower()}");
Console.WriteLine($"Contains 'th': {firstName.Contains("th")}");
Console.WriteLine($"First character: {firstName[0]}");
Console.WriteLine($"Type: {firstName.GetType()}");

a = 10;
b = 20;

Console.WriteLine(a == b);
Console.WriteLine(a != b);
Console.WriteLine(a > b);
Console.WriteLine(a < b);
Console.WriteLine(a >= 10);
Console.WriteLine(b <= 10);



bool c = true;
bool d = false;

Console.WriteLine(c && d);
Console.WriteLine(c || d);
Console.WriteLine(!c);
Console.WriteLine(!d);

a = 5;

Console.WriteLine(a++);
Console.WriteLine(a);
Console.WriteLine(++a);
Console.WriteLine(a--);
Console.WriteLine(a);

age = 22;

if (age >= 18)
{
    Console.WriteLine("You are an adult");
}

int mark = 85;

if (mark >= 90)
{
    Console.WriteLine("A+");
}
else if (mark >= 80)
{
    Console.WriteLine("A");
}
else if (mark >= 70)
{
    Console.WriteLine("B");
}
else
{
    Console.WriteLine("C");
}

Console.Write("Enter your name: ");

string names = Console.ReadLine();

Console.WriteLine($"Hello {names}");


Console.Write("Enter your age: ");

age = int.Parse(Console.ReadLine());

Console.WriteLine($"Your age is {age}");


Console.Write("Enter your name: ");
string name = Console.ReadLine();

Console.Write("Enter your age: ");
int ages = int.Parse(Console.ReadLine());

Console.Write("Enter your height: ");
double heights = double.Parse(Console.ReadLine());

Console.Write("Enter your salary: ");
decimal salarys = decimal.Parse(Console.ReadLine());

Console.Write("Are you a student? (true/false): ");
bool isStudents = bool.Parse(Console.ReadLine());

Console.WriteLine();

Console.WriteLine($"Name: {names}");
Console.WriteLine($"Age: {ages}");
Console.WriteLine($"Height: {heights}");
Console.WriteLine($"Salary: {salarys}");
Console.WriteLine($"Student: {isStudents}");

Console.Write("Enter your role: ");

string role = Console.ReadLine();

switch (role)
{
    case "admin":
        Console.WriteLine("Full access");
        break;

    case "user":
        Console.WriteLine("Limited access");
        break;

    case "guest":
        Console.WriteLine("Guest access");
        break;

    default:
        Console.WriteLine("Unknown role");
        break;
}

int i = 10;

for (i = 0; i < 5; i++)
{
    Console.WriteLine("Aathil");
}




//Console.WriteLine(i);
