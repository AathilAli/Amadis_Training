using System.Data;
using System.Text;

//Console.WriteLine("Hello, World!");


//int[] marks = { 80, 90, 75, 88, 95,'a' };
//Console.WriteLine(marks);//System.Int(32);
//Console.WriteLine(marks[5]);//97

//int[] mark =new int[5];
//mark[4] = 10;
//Console.WriteLine(mark[0]);
//Console.WriteLine(mark);//System.Int(32);


////foreach(int i in mark)
////{
////    Console.WriteLine(i);
////}

//bool[] values = new bool[3]; //false  false  false]
//Console.WriteLine(values.Length);

////int[] array;
////array=new int[];
////array[0] = 10;

//int[] array = { 1, 2, 3, 34 };
////array[10] = 10;/array index out of bounds exception
//string[] ar = { "aathil" ,"af"};

//int[,] arr = { { 1, 2, 3, 4 }, { 1, 2, 3, 4 } };

//Console.WriteLine(arr [0,0]);


//for (int i = 0; i < arr.GetLength(0); i++)
//{
//    for (int j = 0; j < arr.GetLength(1); j++)
//    {
//        Console.Write(arr[i, j] + " ");
//    }

//    Console.WriteLine();
//}
//Console.WriteLine(arr[0,3]);

//Console.WriteLine(arr.Length);

//Console.WriteLine(arr.GetLength(0));

////3D array

//int[,,] arr1 = new int[2, 3, 4];

//int[,,] arr2 =
//{
//    {
//        { 1, 2, 3 },
//        { 4, 5, 6 }
//    },
//    {
//        { 7, 8, 9 },
//        { 10, 11, 12 }
//    }
//};


//Console.WriteLine(arr2[0,0,0]);

//for (int i = 0; i < arr.GetLength(0); i++)
//{
//    for (int j = 0; j < arr.GetLength(1); j++)
//    {
//        Console.Write(arr[i, j] + " ");
//    }

//    Console.WriteLine();
//}

//for(int i=0;i<arr2.GetLength(0); i++)
//{
//    for (int j = 0;j < arr2.GetLength(1); j++)
//    {
//        for (int k = 0; k < arr2.GetLength(2); k++)
//        {
//            Console.WriteLine(arr2[i, j, k]);
//        }
//    }
//}

//Console.WriteLine(arr[0,0]);

//int[][] jaggedArray =
//{
//      new int[] { 10, 20, 30 },
//      new int[] { 40, 50 }
//};
//Console.WriteLine(jaggedArray[0][0]);


//int[] arrrr =new int[4] {1,2,3,4};
//arrrr[4] = 10;
//Console.WriteLine(arrrr[4]);

int[] arrays = { 30, 10, 20, 40 };

Console.WriteLine(arrays.Length);//4
Console.WriteLine(arrays.GetUpperBound(0));//3 give the last index
Array.Sort(arrays);
Array.Reverse(arrays);
int index = Array.IndexOf(arrays, 30);
for (int i = 0; i < arrays.Length; i++)
{
    Console.Write(arrays[i] + " ");
}
Console.WriteLine("\n" + index);

//Console.WriteLine(Array.Sort(arrays));   error 

//int[] arr = { 10, 20, 30, 40 };

//Console.WriteLine("this is the end");

//bool result = Array.Exists(arr, x => x > 25);//True

//Console.WriteLine(Array.Find(arr, x => x > 20));//30

//int[] results = Array.FindAll(arr, x => x > 20);
//Array.ForEach(results,res => Console.WriteLine(res)); //30 40

//Array.Clear(arr);

//foreach (int value in arr)
//{
//    Console.Write(value + " ");
//}
int[] arr = { 10, 20, 30, 40, 50 };

//Array.Clear(arr, 1, 10);

foreach (int value in arr)
{
    Console.Write(value + " ");
}

Console.WriteLine();

Array.Resize(ref arr, 5);

string name = "Aathil";
Console.WriteLine(name);
//name[0] = 'a'; error

string result = "";

for (int i = 0; i < 5; i++)
{
    result += i;
    Console.WriteLine(result.GetType());
}

Console.WriteLine(result);

StringBuilder sb = new StringBuilder();

sb.Append("Hello");
sb.Append(" ");
sb.Append("World");

Console.WriteLine(sb);
Console.WriteLine(sb.ToString());

Console.WriteLine(sb.GetType());
Console.WriteLine(sb.ToString().GetType());
Console.WriteLine(sb.GetType());

string message = sb.ToString();
//string message1 = sb; error cannot assign string builder into string




string text = "  Hello World C#  ";

// 1. Contains()
Console.WriteLine("Contains:");
Console.WriteLine(text.Contains("World"));

// 2. Substring()
Console.WriteLine("\nSubstring:");
Console.WriteLine(text.Substring(2, 5));

// 3. IndexOf()
Console.WriteLine("\nIndexOf:");
Console.WriteLine(text.IndexOf("World"));

// 4. Replace()
Console.WriteLine("\nReplace:");
Console.WriteLine(text.Replace("World", "CSharp"));

// 5. Split()
Console.WriteLine("\nSplit:");
string fruits = "Apple,Banana,Orange";

string[] fruitArray = fruits.Split(',');

foreach (string fruit in fruitArray)
{
    Console.WriteLine(fruit);
}

// 6. Trim()
Console.WriteLine("\nTrim:");
Console.WriteLine(text.Trim());