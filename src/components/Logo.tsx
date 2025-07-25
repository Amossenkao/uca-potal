'use client';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="h-12 w-12 flex items-center justify-center">
        <img src="https://res.cloudinary.com/dcalueltd/image/upload/v1753368074/school-management-system/uca/Logo.png" alt="School Logo" />
      </div>
      <div>
        <h1 className="text-xl font-bold hidden lg:block">Upstairs</h1>
        <h1 className="text-xl font-bold lg:hidden">UCA</h1>
        <p className="text-xs text-muted-foreground hidden sm:block">Excellence in Education</p>
      </div>
    </div>
  );
}