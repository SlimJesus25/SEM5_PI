import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CategoriaSalaProps {
    value: string;
  }
  
  export class UserEmail extends ValueObject<CategoriaSalaProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: CategoriaSalaProps) {
      super(props);
    }
  
    public static create (email: string): Result<UserEmail> {
      const guardResult = Guard.againstNullOrUndefined(email, 'email');
      if (!guardResult.succeeded) {
        return Result.fail<UserEmail>(guardResult.message);
      } else {
        return Result.ok<UserEmail>(new UserEmail({ value: email }))
      }
    }
  }