using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using FluentScheduler;
using ShopAPI.Model;
using ShopAPI.Data.Item;
using ShopAPI.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Newtonsoft.Json;

namespace ShopAPI
{

    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            JobManager.Initialize(new ScheduledJobRegistry());

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }



    public class ScheduledJobRegistry : Registry
    {

        public ScheduledJobRegistry()
        {
            Schedule<MyJob>()
                    .NonReentrant() // Only one instance of the job can run at a time
                    .ToRunOnceAt(DateTime.Now.AddSeconds(10))    // Delay startup for a while
                    .AndEvery(2).Seconds();     // Interval

            // TODO... Add more schedules here
        }
    }



    public class MyJob : IJob
    {

        public async void Execute()
        {
            //var context = new ShopContext();
            //var books = context.Items.FromSqlRaw("SELECT * From ItemBalance").ToList();
            //using (var cont = new ShopContext())
            //{
            //var books = cont.Items.FromSqlRaw("SELECT * From ItemBalance").ToList();
            //}
            //HttpClient client = new HttpClient();

            //var response = await client.GetAsync("https://localhost:7285/api/Item");



            //var response = await _httpClient.PostAsync($"{_url}/api/files", form);

            try
            {





                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                // Pass the handler to httpclient(from you are calling api)
                HttpClient client = new HttpClient(clientHandler);

                HttpResponseMessage response = await client.PutAsync("https://localhost:7285/api/ItemBalance/daily", null);

                //response.EnsureSuccessStatusCode();
                //string responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);
                //var tikrasResponse = JsonConvert.DeserializeObject<ICollection<ItemModel>>(responseBody);

                //foreach (var item in tikrasResponse)
                //{
                //Console.WriteLine(item.Id, item.Quantity);


                //}
                //Console.WriteLine(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }





            // var client = new HttpClient
            // {
            //     BaseAddress = new("https://localhost:7285")
            // };

            // Execute your scheduled task here
            //Console.WriteLine("The time is {0: yyyy-MM-dd HH:mm:ss}", DateTime.Now);


        }
    }
}
