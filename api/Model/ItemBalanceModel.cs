using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class ItemBalanceModel : BaseEntity
    {
        public int? Amount { get; set; }
        public string Date { get; set; }

        public Guid ItemId { get; set; }
        public ItemModel Item { get; set; }
    }
}