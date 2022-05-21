using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class ItemBalanceModel
    {
        [Key]
        public int Id { get; set; }
        public int? Amount { get; set; }
        public string Date { get; set; }
        public int ItemId { get; set; }

    }
}