int[] marks = new int[5];

marks[0] = 80;
marks[1] = 75;
marks[2] = 90;
marks[3] = 65;
marks[4] = 88;


Console.WriteLine(marks);
string[] names = { "Aathil", "Arun", "Rahul" };
for(int i=0; i<names.Length; i++)
{
    Console.WriteLine(names[i]);
}
foreach(string name in names)
{
    Console.WriteLine(name);
}
names[0] = "aathil ali";

//int[] marks = { 80, 75, 90, 65, 88 };

bool found = false;

foreach (int mark in marks)
{
    if (mark == 90)
    {
        found = true;
        break;
    }
}

if (found)
{
    Console.WriteLine("Found");
}
else
{
    Console.WriteLine("Not found");
}

Console.Write("How many marks? ");
int n = Convert.ToInt32(Console.ReadLine());

//int[] marks = new int[n];

for (int i = 0; i < marks.Length; i++)
{
    Console.Write($"Enter mark {i + 1}: ");
    marks[i] = Convert.ToInt32(Console.ReadLine());
}


int age = 22;

bool result = age >= 18 ? true : false;

Console.WriteLine(result);

int mark = 75;

string result = mark >= 50 ? "PASS" : "FAIL";

Console.WriteLine(result);


