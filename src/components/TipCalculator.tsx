import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [people, setPeople] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const predefinedTips = ["5", "10", "15", "20", "25"];

  useEffect(() => {
    calculateTip();
  }, [bill, tipPercentage, people]);

  const calculateTip = () => {
    const billAmount = parseFloat(bill) || 0;
    const tipPercent = parseFloat(tipPercentage) || 0;
    const numberOfPeople = parseInt(people) || 1;

    if (billAmount > 0 && tipPercent >= 0 && numberOfPeople > 0) {
      const tip = (billAmount * tipPercent) / 100;
      const total = billAmount + tip;
      setTipAmount(tip);
      setTotalPerPerson(total / numberOfPeople);
    } else {
      setTipAmount(0);
      setTotalPerPerson(0);
    }
  };

  const handleTipSelect = (tip: string) => {
    setTipPercentage(tip);
    setCustomTip("");
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setTipPercentage(value);
  };

  const handleReset = () => {
    setBill("");
    setTipPercentage("");
    setPeople("");
    setCustomTip("");
    setTotalPerPerson(0);
    setTipAmount(0);
    toast.success("Калькулятор сброшен");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(value);
  };

  const handleBillChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setBill(value);
      if (parseFloat(value) > 1000000) {
        toast.error("Слишком большая сумма счёта");
      }
    }
  };

  const handlePeopleChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setPeople(value);
      if (parseInt(value) > 100) {
        toast.error("Слишком много человек");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-mint-50 via-mint-100 to-mint-200">
      <div className="w-full max-w-4xl animate-fadeIn">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold leading-tight py-1">
            <a
              href="https://t.me/FSCoding"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-todo-accent to-purple-500 bg-clip-text text-transparent hover:underline"
            >
              FullStack Coding
            </a>
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent animate-fade-in">
            Калькулятор чаевых
          </h2>
          <p className="text-gray-600 animate-fade-in delay-200 text-lg">
            Удобный расчёт чаевых и общей суммы на человека
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 shadow-2xl backdrop-blur-lg animate-slide-in-right">
          <div className="space-y-8">
            <div className="space-y-3 animate-fade-in delay-300 group">
              <Label
                htmlFor="bill"
                className="text-lg font-medium text-gray-700 group-hover:text-mint-600 transition-colors"
              >
                Сумма счёта
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₽
                </span>
                <Input
                  id="bill"
                  type="text"
                  placeholder="0.00"
                  value={bill}
                  onChange={(e) => handleBillChange(e.target.value)}
                  className="pl-8 text-lg font-medium hover:scale-[1.02] transition-all duration-200 border-2 focus:border-mint-400 focus:ring-mint-200"
                />
              </div>
            </div>

            <div className="space-y-3 animate-fade-in delay-400">
              <Label className="text-lg font-medium text-gray-700">
                Процент чаевых
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {predefinedTips.map((tip) => (
                  <Button
                    key={tip}
                    variant={tipPercentage === tip ? "default" : "outline"}
                    className={`${
                      tipPercentage === tip
                        ? "bg-mint-500 hover:bg-mint-600 text-white"
                        : "hover:bg-mint-100 border-2"
                    } text-lg font-medium hover:scale-105 transition-all duration-300`}
                    onClick={() => handleTipSelect(tip)}
                  >
                    {tip}%
                  </Button>
                ))}
                <Input
                  type="text"
                  placeholder="Другой %"
                  value={customTip}
                  onChange={(e) => handleCustomTipChange(e.target.value)}
                  className="text-lg font-medium hover:scale-[1.02] transition-all duration-200 border-2 focus:border-mint-400 focus:ring-mint-200"
                />
              </div>
            </div>

            <div className="space-y-3 animate-fade-in delay-500">
              <Label
                htmlFor="people"
                className="text-lg font-medium text-gray-700"
              >
                Количество человек
              </Label>
              <Input
                id="people"
                type="text"
                placeholder="1"
                value={people}
                onChange={(e) => handlePeopleChange(e.target.value)}
                className="text-lg font-medium hover:scale-[1.02] transition-all duration-200 border-2 focus:border-mint-400 focus:ring-mint-200"
                min="1"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-mint-500 to-mint-600 rounded-2xl p-8 text-white flex flex-col justify-between animate-scale-in shadow-xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center hover:scale-105 transition-transform p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div>
                  <p className="text-xl font-medium text-white">Чаевые</p>
                  <p className="text-sm text-mint-100">на человека</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatCurrency(tipAmount / (parseInt(people) || 1))}
                </p>
              </div>

              <div className="flex justify-between items-center hover:scale-105 transition-transform p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div>
                  <p className="text-xl font-medium text-white">Всего</p>
                  <p className="text-sm text-mint-100">на человека</p>
                </div>
                <p className="text-4xl font-bold">
                  {formatCurrency(totalPerPerson)}
                </p>
              </div>
            </div>

            <Button
              onClick={handleReset}
              className="w-full mt-8 bg-white text-mint-600 hover:bg-mint-50 hover:scale-105 transition-all duration-300 text-lg font-medium shadow-lg"
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;
